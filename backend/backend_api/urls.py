from backend_api.views import ClientViewSet
from rest_framework.routers import DefaultRouter
from backend_api import views


router = DefaultRouter()
router.register(r'clients', views.ClientViewSet, basename='client')
urlpatterns = router.urls
