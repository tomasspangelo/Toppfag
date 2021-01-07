from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from . import models


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)

        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')


class CommentSerializer(serializers.ModelSerializer):

    author_username = serializers.SerializerMethodField()

    def get_author_username(self, obj):
        author_username = obj.author.username
        return author_username

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.grade = validated_data.get('grade', instance.grade)
        instance.course_code = validated_data.get('course_code', instance.course_code)
        instance.difficulty = validated_data.get('difficulty', instance.difficulty)
        instance.quality = validated_data.get('quality', instance.quality)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

    class Meta:
        model = models.Comment
        fields = ('id', 'author_username', 'grade', 'course_code', 'would_take_again',
                  'difficulty', 'quality', 'content', 'created_at', 'updated_at')
