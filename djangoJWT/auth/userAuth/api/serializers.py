from rest_framework.serializers import ModelSerializer
from userAuth.models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"