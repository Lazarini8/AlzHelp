import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Picker atualizado
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEventos } from '../EventoContext';

export default function BlocoNotas() {
   const navigation = useNavigation();
  // Estados do aplicativo
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Geral');
  const [priority, setPriority] = useState('Média');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const { notaDestaque, setNotaDestaque } = useEventos();


  // Cores para cada prioridade
  const priorityColors = {
    'Alta': '#ff6b6b',
    'Média': '#ffd93d',
    'Baixa': '#6bcf63'
  };

  // Carregar notas ao iniciar
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes) setNotes(JSON.parse(savedNotes));
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as notas');
      }
    };
    loadNotes();
  }, []);

  // Salvar nota
  const saveNote = async () => {
    if (!title.trim()) {
      Alert.alert('Aviso', 'Digite um título para a nota');
      return;
    }

    const newNote = {
      id: editingId || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedNotes;
    if (editingId) {
      updatedNotes = notes.map(note => note.id === editingId ? newNote : note);
    } else {
      updatedNotes = [...notes, newNote];
    }

    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    resetForm();
    Keyboard.dismiss();
  };

  // Editar nota
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setPriority(note.priority);
    setEditingId(note.id);
  };

  // Excluir nota
  const deleteNote = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            const updatedNotes = notes.filter(note => note.id !== id);
            setNotes(updatedNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
          }
        }
      ]
    );
  };

  // Limpar formulário
  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('Geral');
    setPriority('Média');
    setEditingId(null);
  };

  // Filtrar notas por busca e categoria
  const filteredNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Função para marcar/desmarcar nota como destaque
  const toggleDestaque = (note) => {
    if (notaDestaque && notaDestaque.id === note.id) {
      setNotaDestaque(null); // Remove da tela Home
    } else {
      setNotaDestaque(note); // Adiciona à tela Home
    }
  };

  return (
    
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>

         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#666" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Bloco de Notas</Text>

      </View>
        
        {/* Busca */}
       <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar notas..."
            value={searchTerm}
            onChangeText={setSearchTerm}/>
        </View>

      {/* Formulário de nota */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Título da nota"
          value={title}
          onChangeText={setTitle}
        />
        
        <TextInput
          style={styles.contentInput}
          placeholder="Conteúdo..."
          multiline
          value={content}
          onChangeText={setContent}
        />
        
        <View style={styles.pickerRow}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              style={styles.picker}
            >
              <Picker.Item label="Geral" value="Geral" />
              <Picker.Item label="Trabalho" value="Trabalho" />
              <Picker.Item label="Pessoal" value="Pessoal" />
              <Picker.Item label="Estudos" value="Estudos" />
            </Picker>
          </View>
          
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={priority}
              onValueChange={setPriority}
              style={styles.picker}
            >
              <Picker.Item label="Alta" value="Alta" />
              <Picker.Item label="Média" value="Média" />
              <Picker.Item label="Baixa" value="Baixa" />
            </Picker>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveNote}
        >
          <Text style={styles.saveButtonText}>
            {editingId ? 'Atualizar Nota' : 'Salvar Nota'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de notas */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteCard, { borderLeftColor: priorityColors[item.priority] }]}>
            <View style={styles.noteHeader}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <View style={styles.noteMeta}>
                <Text style={styles.noteCategory}>{item.category}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: priorityColors[item.priority] }]}>
                  <Text style={styles.priorityText}>{item.priority}</Text>
                     
                </View>
              </View>
            </View>
            
            {item.content ? (
              <Text style={styles.noteContent} numberOfLines={3}>
                {item.content}
              </Text>
            ) : null}
            
            <Text style={styles.noteDate}>
              {new Date(item.updatedAt).toLocaleString()}
            </Text>
            
            <View style={styles.noteActions}>

               <TouchableOpacity style={styles.destaqueButton} onPress={() => toggleDestaque(item)}>
                <Icon name={notaDestaque?.id === item.id ? "star" : "star-outline"} size={25} 
                 color={notaDestaque?.id === item.id ? "#FFD700" : "#ccc"} />
                </TouchableOpacity>

              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => editNote(item)}
              >
                <Icon name="edit" size={20} color="#3498db" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteNote(item.id)}
              >
                <Icon name="delete" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma nota encontrada</Text>
        }
        contentContainerStyle={styles.notesList}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 15,
  },
    backButton: {
    padding: 5,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 2,
    marginBottom: 18,
    marginTop: -20,
   
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  titleInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  contentInput: {
    fontSize: 16,
    minHeight: 80,
    maxHeight: 150,
    marginBottom: 15,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    width: '48%',
  },
  picker: {
    height: 55,
  },
  saveButton: {
    backgroundColor: '#693fbb',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notesList: {
    paddingBottom: 20,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  noteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteCategory: {
    backgroundColor: '#e0f7fa',
    color: '#00838f',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
    marginRight: 8,
  },
  priorityBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noteContent: {
    color: '#555',
    marginBottom: 10,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginRight: 15,
  },
   destaqueButton: {
    marginRight: 10,
    marginTop: -3,
  },
  deleteButton: {},

  emptyText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
    color: '#777',
    fontSize: 16,
  },
});


 
