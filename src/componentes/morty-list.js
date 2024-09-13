import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => setCharacters(data.results.slice(0, 20))) 
      .catch(error => console.error('Error fetching characters:', error));
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id} onClick={() => openModal(character)}>
            {character.name}
          </li>
        ))}
      </ul>

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Character Info"
      >
        {selectedCharacter && (
          <div>
            <h2>{selectedCharacter.name}</h2>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <p>Status: {selectedCharacter.status}</p>
            <p>Species: {selectedCharacter.species}</p>
            <p>Gender: {selectedCharacter.gender}</p>
            <p>Origin: {selectedCharacter.origin.name}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CharacterList;