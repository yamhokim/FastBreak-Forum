from .serializers import UserRegistrationSerializer, BlogSerializer, UserProfileUpdateSerializer, UserInfoSerializer
from .models import Blog
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import get_user_model

@api_view(["POST"])
def register_user(request):
	print(request.data)
	serializer = UserRegistrationSerializer(data=request.data)
	
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user(request):
	user = request.user
	serializer = UserProfileUpdateSerializer(user, data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)

	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_blog(request):
	user = request.user

	serializer = BlogSerializer(data=request.data)
	
	if serializer.is_valid():
		serializer.save(author=user)
		return Response(serializer.data)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogListPagination(PageNumberPagination):
	page_size = 6
	page_size_query_param = 'page_size'

@api_view(["GET"])
def blog_list(request):
	blogs = Blog.objects.all()
	paginator = BlogListPagination()
	paginated_blogs = paginator.paginate_queryset(blogs, request)

	serializer = BlogSerializer(paginated_blogs, many=True)
	return paginator.get_paginated_response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_blog(request, pk):
	user = request.user
	blog = Blog.objects.get(id=pk)

	if blog.author != user:
		return Response({"error": "You are not the author of this post!"}, status=status.HTTP_403_FORBIDDEN)
	
	serializer = BlogSerializer(blog, data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_blog(request, pk):
	blog = Blog.objects.get(id=pk)
	user = request.user
	if blog.author != user:
		return Response({"error": "You are not the author of this post!"}, status=status.HTTP_403_FORBIDDEN)
	
	blog.delete()
	return Response({"message": "Blog deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])
def get_blog(request, slug):
	blog = Blog.objects.get(slug=slug)
	serializer = BlogSerializer(blog)
	return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
	user = request.user
	username = user.username
	return Response({"username": username})

@api_view(["GET"])
def get_userinfo(request, username):
	User = get_user_model()
	user = User.objects.get(username=username)
	serializer = UserInfoSerializer(user)
	return Response(serializer.data)
