from django.contrib import admin
from .models import Anime, AnimeReview, AnimeList, ReviewLike

admin.site.register(Anime)
admin.site.register(AnimeReview)
admin.site.register(AnimeList)
admin.site.register(ReviewLike)