from rest_framework import serializers
from django.contrib.auth.models import User
from .models import WardrobeItem, Outfit, Recommendation

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class WardrobeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardrobeItem
        fields = ["id", "name", "category", "color", "material", "season", "image", "owner", "date_added"]
        # owner and date_added are set automatically
        read_only_fields = ("id", "owner", "date_added")


class OutfitSerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(queryset=WardrobeItem.objects.all(), many=True)

    class Meta:
        model = Outfit
        fields = ["id", "name", "items", "occasion", "season", "is_ai_generated", "created_at"]
        read_only_fields = ("id", "user", "is_ai_generated", "created_at")


class RecommendationSerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(queryset=WardrobeItem.objects.all(), many=True)

    class Meta:
        model = Recommendation
        fields = ["id", "items", "text", "occasion", "created_at"]
        read_only_fields = ("id", "user", "created_at")
