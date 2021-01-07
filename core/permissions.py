from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        # Read permissions to any request
        # GET/HEAD/OPTIONS always allowed
        if request.method in permissions.SAFE_METHODS:
            return True


        return obj.author == request.user
