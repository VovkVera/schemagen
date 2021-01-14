from django.test import TestCase

from .models import User, Schema, Field


class FieldTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="u", email="u@g.com", password=None)
        user.save()
        schema = Schema.objects.create(user=user, name='test_schema_name')
        schema.save()
        field_1 = Field.objects.create(name='test_field1_name', order=1, kind = "Job", schema=schema)
        field_1.save()
        field_2 = Field.objects.create(name='test_field2_name', order=2, kind = "Full name", schema=schema)
        field_2.save()

    def test_fields_count(self):
        schema = Schema.objects.get(name='test_schema_name')
        self.assertEqual(schema.fields.count(), 2)
