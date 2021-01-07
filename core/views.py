from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, CommentSerializer
from .models import Comment
from .permissions import IsOwnerOrReadOnly

@api_view(['GET'])
def current_user(request):
    """
        Determine the current user by their token, and return their data
    """


    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
        Create a new user. It's called 'UserList' because normally we'd have a get
        method here too, for retrieving a list of all User objects.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def post(self, request, format=None):
        author = request.user
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=author)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseCommentList(generics.ListAPIView):
    serializer_class = CommentSerializer

    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        course_code = self.kwargs['course_code']

        return Comment.objects.filter(course_code=course_code)


class CommentDetail(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, request, format=None, id=None):
        try:
            return Response(CommentSerializer(Comment.objects.get(pk=id)).data)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, id):
        instance = Comment.objects.get(pk=id)
        serializer = CommentSerializer(instance, request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        instance = Comment.objects.get(pk=id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)








