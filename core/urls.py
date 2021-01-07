from django.urls import path, include
from .views import current_user, UserList, CommentList, CourseCommentList, CommentDetail
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework import routers


urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('token-auth/', obtain_jwt_token),
    path('comments/', CommentList.as_view()),
    path('comments/courses/<course_code>/', CourseCommentList.as_view()),
    path('comments/<id>', CommentDetail.as_view())
]