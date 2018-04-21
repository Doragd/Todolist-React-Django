from django.conf.urls import include, url
from rest_framework import routers
from .views import TodoViewSet

router = routers.DefaultRouter()
router.register(r'list',TodoViewSet)
urlpatterns = router.urls