import sys; sys.path.append('.')
from api.models.event import Event
from langchain_core.vectorstores import VectorStore
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pathlib import Path
import numpy as np
from bs4 import BeautifulSoup
import dotenv
dotenv.load_dotenv()
import os
from sqlalchemy.sql.expression import func

class EventRecommendationModel: 
    def __init__(
            self, 
            vector_store_path: Path = Path('models/eventsVectorStore'), 
            session: sessionmaker = sessionmaker(bind=create_engine(os.getenv("DATABASE_URL")))()
        ): 
        self.session = session
        self.embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vector_store_path = vector_store_path
        self.vector_store = self.loadVectorStore()

    def loadVectorStore(self):
        if not self.vector_store_path.exists():
            self.vector_store_path.parent.mkdir(parents=True, exist_ok=True)
            self.saveVectorStoreEvent()
            
        vectorStore = FAISS.load_local(
            self.vector_store_path, 
            embeddings=self.embedding_model, 
            allow_dangerous_deserialization=True
        )
        return vectorStore

    def saveVectorStoreEvent(self):
        # load events 
        events = self.session.query(Event).all()

        # preprocess Description
        for event in events:
            event.description = self._preprocess_description(event.description)

        # convert to documents
        documents = [Document(page_content=event.description, metadata={"event_id": event.event_id}) for event in events]

        # create vector store
        vector_store = FAISS.from_documents(documents, self.embedding_model)
        vector_store.save_local(self.vector_store_path)

    def _preprocess_description(self, description):
        soup = BeautifulSoup(description, "html.parser")
        text = soup.get_text()
        return text

    def recommend_events(self, pastEvents: list[Event], k: int = 5):
        if not pastEvents:
            # select random value if no pastEvents
            pastEvents = [self.session.query(Event).order_by(func.random()).first()]

        # get embeddings for past events
        pastEventsDescription = [event.description for event in pastEvents]
        processedPastEventsDescription = [self._preprocess_description(desc) for desc in pastEventsDescription]
        pastEventEmbeddings = self.embedding_model.embed_documents(processedPastEventsDescription)

        # average embeddigns to get prefrence vector
        preferenceVector = np.mean(pastEventEmbeddings, axis=0)
        
        # find similar events
        similar_events = self.vector_store.similarity_search_by_vector(preferenceVector, k=k)
        return similar_events

if __name__ == "__main__": 
    model = EventRecommendationModel()
    recommendations = model.recommend_events([])
    
    for event in recommendations:
        print("Metadata:", event.metadata)