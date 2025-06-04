from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Anime(models.Model):
    title_romaji = models.CharField(max_length=255)
    title_native = models.CharField(max_length=255)
    title_ko = models.CharField(max_length=255)
    title_es = models.CharField(max_length=255)

    description_ko = models.TextField(null=True, blank=True)
    description_en = models.TextField(null=True, blank=True)
    description_es = models.TextField(null=True, blank=True)

    format = models.CharField(max_length=50)
    episodes = models.IntegerField(null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)

    start_year = models.IntegerField()
    start_month = models.IntegerField(null=True, blank=True)
    start_day = models.IntegerField(null=True, blank=True)

    end_year = models.IntegerField(null=True, blank=True)
    end_month = models.IntegerField(null=True, blank=True)
    end_day = models.IntegerField(null=True, blank=True)

    season_ko = models.CharField(max_length=50, null=True, blank=True)
    season_en = models.CharField(max_length=50, null=True, blank=True)
    season_es = models.CharField(max_length=50, null=True, blank=True)

    status_ko = models.CharField(max_length=50)
    status_en = models.CharField(max_length=50)
    status_es = models.CharField(max_length=50)

    source_ko = models.CharField(max_length=50, null=True, blank=True)
    source_en = models.CharField(max_length=50, null=True, blank=True)
    source_es = models.CharField(max_length=50, null=True, blank=True)

    cover_image_xl = models.URLField()
    cover_image_l = models.URLField()
    cover_image_m = models.URLField()
    banner_image = models.URLField(null=True, blank=True)

    genres_ko = models.JSONField()
    genres_en = models.JSONField()
    genres_es = models.JSONField()
    studios = models.JSONField()

    def __str__(self):
        return self.title_ko

class AnimeReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ReviewLike(models.Model):
    review = models.ForeignKey(AnimeReview, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('review', 'user')

class AnimeList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'anime')

