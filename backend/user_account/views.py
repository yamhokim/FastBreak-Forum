from django.shortcuts import render
from .serializers import UserRegistrationSerializer, BlogSerializer
from .models import Blog
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

@api_view(["POST"])
def register_user(request):
	print(request.data)
	serializer = UserRegistrationSerializer(data=request.data)
	
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

@api_view(["GET"])
def blog_list(request):
	blogs = Blog.objects.all()
	serializer = BlogSerializer(blogs, many=True)
	return Response(serializer.data)

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