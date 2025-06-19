from transformers import pipeline
from bs4 import BeautifulSoup
import re

class NERModel:
    def __init__(self):
        # Use a stronger NER model (you can change this to another if needed)
        self.model = pipeline(
            "ner",
            model="Jean-Baptiste/roberta-large-ner-english",
            tokenizer="Jean-Baptiste/roberta-large-ner-english",
            grouped_entities=True
        )
        # self.accepted_entity_types = {"PER", "LOC", "ORG"}  # Customize as needed
        self.blacklist_words = {}  # Add more if needed

    def getNamedEntities(self, text: str):
        """
        Predict named entities in the given text.

        Args:
            text (str): The input text to analyze.

        Returns:
            list: A list of cleaned, unique, relevant named entities.
        """
        text = self._preprocess_description(text)
        result = self.model(text)

        named_entities = list(set([
            cleaned for entity in result
            if entity['score'] > 0.3
            # and entity['entity_group'] in self.accepted_entity_types
            and self._is_valid_entity(cleaned := self._clean_entity_word(entity['word']))
        ]))

        return named_entities

    def _clean_entity_word(self, word):
        """
        Cleans subword artifacts and extra spacing.

        Args:
            word (str): Raw entity word

        Returns:
            str: Cleaned entity word
        """
        word = word.replace("##", "")  # remove subword markers
        word = re.sub(r'\s+', ' ', word)
        return word.strip()

    def _is_valid_entity(self, word):
        """
        Checks if the entity is meaningful (not junk or blacklisted).

        Args:
            word (str): Cleaned entity word

        Returns:
            bool: True if valid, False otherwise
        """
        if len(word) < 3:
            return False
        if word.lower() in self.blacklist_words:
            return False
        if not re.search(r'[a-zA-Z]', word):
            return False
        return True

    def _preprocess_description(self, description):
        """
        Removes HTML tags and returns plain text.

        Args:
            description (str): Input HTML or raw text

        Returns:
            str: Clean text
        """
        soup = BeautifulSoup(description, "html.parser")
        return soup.get_text()

if __name__ == "__main__":
    ner_model = NERModel()
    sample_text = "<p>Apple Inc. is looking to hire new employees in San Francisco.</p>"
    entities = ner_model.getNamedEntities(sample_text)
    print("Named Entities:", entities)