from django.db import models
from django.contrib.auth.models import User


class Comment(models.Model):
    author = models.ForeignKey(User,
                               on_delete=models.CASCADE)
    grade = models.CharField(max_length=20)
    course_code = models.CharField(max_length=15)
    would_take_again = models.CharField(max_length=3)
    difficulty = models.FloatField()
    quality = models.FloatField()
    content = content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.course_code + ' / ' + self.grade + ' / ' + self.author.username



