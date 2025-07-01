from django.contrib import admin
from .models import Anime, AnimeReview, AnimeList, ReviewLike

@admin.register(Anime)
class AnimeAdmin(admin.ModelAdmin):
    list_display = [
        "id", 
        "title_ko", 
        "start_year", 
        "format", 
        "get_cover_thumb",
        "banner_image",
    ]
    search_fields = ["title_ko", "title_romaji", "title_native"]
    list_filter = ["start_year", "format"]
    readonly_fields = ["get_cover_thumb"]
    ordering = ["-start_year", "title_ko"]

    def get_cover_thumb(self, obj):
        if obj.cover_image_xl:
            from django.utils.html import format_html
            return format_html('<img src="{}" width="60" height="80" style="object-fit:cover;" />', obj.cover_image_xl)
        return "-"
    get_cover_thumb.short_description = "커버 이미지"


admin.site.register(AnimeReview)
admin.site.register(AnimeList)
admin.site.register(ReviewLike)
