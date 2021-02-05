
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes

    path("add_custom_field/<int:schema_id>", views.add_custom_field, name="add_custom_field"),
    path("submit_schema", views.submit_schema, name="submit_schema"),
    path("submit_schema_steply", views.submit_schema_steply, name="submit_schema_steply"),
    path("generation_data", views.generation_data, name="generation_data"),

]
