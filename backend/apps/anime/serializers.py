from rest_framework import serializers
from .models import Anime

class AnimeSimpleSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Anime
        fields = ["id", "title", "coverImage_large"]

    def get_lang(self):
        return self.context.get("lang", "ko")

    def get_title(self, obj):
        lang = self.get_lang()
        return getattr(obj, f"title_{lang}", obj.title_ko)
