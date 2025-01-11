// RoomManager.js
import React, { useState, useEffect } from 'react';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseUrl } from './services/config';
import { httpPostFormData, httpPut } from './services/http';

const RoomManager = ({ onClose }) => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({ name: '', description: '', price: 0, images: [] });
    const [editingRoom, setEditingRoom] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileEdit, setSelectedFileEdit] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesEdit, setSelectedFilesEdit] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false);
    
  
    useEffect(() => {
      try{
      fetch(`${baseUrl}/api/v1/lodge/rooms`)
        .then(res => res.json())
        .then(data => setRooms(data));
      }catch(e){

      }finally{
        setLoading(false)
      }
    }, [reload]);
  
    const handleCreateRoom = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      for (const key in newRoom){
          formData.append(key, newRoom[key])
      }
      selectedFiles.forEach(file => formData.append('images', file));


      try {
        setLoading(true)
          const response = await fetch(`${baseUrl}/api/v1/lodge/rooms`, {
              method: 'POST',
              body: formData,
          });
          const data = await response.json();
          setRooms([...rooms, data.room]);
          setNewRoom({ name: '', description: '', price: 0, images: [] });
          setSelectedFiles([])
      } catch (error) {
          console.error('Error creating room:', error);
      } finally{
        setLoading(false)
      }
  };
  const handleFileChange = async (values) => {
          // console.log({value})
          // setSelectedFile(event.target.files[0]);
          const formData = new FormData();
          if (values) {
            values.forEach(file => formData.append('images', file));
          }
          try{
              // setLoading(true)
              // showLoader();
          
          const res =await httpPostFormData('/api/v1/lodge/uploads', formData);
          console.log({res });
          if(res.status === true){
          setEditingRoom({...editingRoom, images: [...editingRoom.images, ...res?.imgUrl]})
          }
          // setNExperience({...nExperience, image: res?.imgUrl})
          // setLocalHomeContent(prev => ({
          //     ...prev,
          //     experiences: prev.experiences.map((exp, i) => i === index ? { ...exp, image: data?.imgUrl, isBeingUpdated: true } : exp)
          // }));
      }catch(err) {
  
      }finally{
          setLoading(false)
          // hideLoader()
      }
      };
    const handleUpdateAvailability = (roomName, available) => {
      fetch(`${baseUrl}/api/v1/lodge/rooms/${roomName}/availability`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available }), // Send the new availability status
      })
        .then(res => res.json())
        .then(updatedRoom => {
          setRooms(prevRooms =>
            prevRooms.map(room => (room.name === roomName ? updatedRoom.room : room))
          );
        });
    };
    const handleUpdateRoom = async (e, id) => {
      e.preventDefault();
  
      // const formData = new FormData()
      //   formData.append('room', JSON.stringify(editingRoom))
      //   selectedFilesEdit.forEach(file => formData.append('images', file));

      //   try {
      //     setLoading(true)
      //       const response = await fetch(`${baseUrl}/api/v1/lodge/rooms/${id}`, {
      //           method: 'PUT',
      //           body: formData
      //       })
      //       const updatedRoom = await response.json()
      //       // setRooms(prevRooms => prevRooms.map(room => room.name === originalName ? updatedRoom.room : room))
      //       setEditingRoom(null)
      //       setSelectedFilesEdit([])
      //   } catch (error) {
      //       console.error('Error updating room', error)
      //   } finally{
      //     setLoading(false)
      //   }

      const res = httpPut(`/api/v1/lodge/rooms/${id}`, editingRoom)
    };
  
    const handleDeleteRooms = (roomName, image) => {
      fetch(`${baseUrl}/api/v1/lodge/rooms/${roomName}/images/${image}`, {
        method: 'DELETE'
    })
    .then(() => {
        setRooms(prevRooms => {
            return prevRooms.map(room => {
                if (room.name === roomName){
                    return {...room, images: room.images.filter(img => img !== `/uploads/${image}`)}
                }
                return room
            })
        })
        if (editingRoom?.name === roomName){
            setEditingRoom({...editingRoom, images: editingRoom.images.filter(img => img !== `/uploads/${image}`)})
        }
    })
    };

    const handleDeleteRoom = (roomName) => {
      fetch(`${baseUrl}/api/v1/lodge/rooms/${roomName}`, { method: 'DELETE' })
        .then(() => setRooms(rooms.filter(room => room.name !== roomName)));
    };

    const handleDeleteImage = (id, image) => {
      // fetch(`${baseUrl}/api/v1/lodge/rooms/${id}/images`, {
      //     method: 'PUT',
      //     body: JSON.stringify({image})
      // })
      const res = httpPut(`/api/v1/lodge/rooms/${id}/images`, {image})
      // .then(() => {
      //     setRooms(prevRooms => {
      //         return prevRooms.map(room => {
      //             if (room.name === roomName){
      //                 return {...room, images: room.images.filter(img => img !== `/uploads/${image}`)}
      //             }
      //             setReload(!reload);
      //             return room
      //         })
      //     })
      //     if (editingRoom?.name === roomName){
      //         setEditingRoom({...editingRoom, images: editingRoom.images.filter(img => img !== `/uploads/${image}`)})
      //     }
      // })
  }
  if (loading) {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
}
  return (
    <div className="app-container">
    <div className="room-manager ml-20">
      <div className='text-center'>
      <h2>Manage Rooms</h2>
      </div>

      <h3>Add New Room</h3>
      <form onSubmit={handleCreateRoom}>
        <input
          className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text" placeholder="Name" value={newRoom.name} onChange={e => setNewRoom({ ...newRoom, name: e.target.value })} required />
        <input
          className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text" placeholder="Description" value={newRoom.description} onChange={e => setNewRoom({ ...newRoom, description: e.target.value })} required />
        {/* <input type="text" placeholder="Image URL" value={newRoom.image} onChange={e => setNewRoom({ ...newRoom, image: e.target.value })} required /> */}
        <input
            className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         type="number" placeholder="Price" value={newRoom.price} onChange={e => setNewRoom({ ...newRoom, price: parseInt(e.target.value) })} required />
        <input
          className="block w-1/2 mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size"
          type="file"
          multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />
        <button
         className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700'

        type="submit">Create Room</button>
      </form>

      <h3 className='mt-5'>Existing Rooms</h3>
      <ul>
        <table 
        className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'
        >
          {!editingRoom?.name ? (
          <thead
          className='text-xs w-1/2 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
          >
            <tr>
            <th scope="col" className="px-6 py-3">Rooms 
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Action</th>
              </th>
              {/* <th scope="col" className="px-6 py-3">Price</th><th scope="col" className="px-6 py-3">Description</th><th scope="col" className="px-6 py-3">Action</th> */}
            </tr>
          </thead> ) :
          ''}
        {rooms.map(room => (
          <li key={room?.name}>
            {editingRoom?.name === room?.name ? (
                
                <form onSubmit={(e) => handleUpdateRoom(e, room?.id)} className='border w-1/2 p-2'>
                    <input
                       className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text" value={editingRoom?.name} onChange={e => setEditingRoom({...editingRoom, name: e.target.value})} />
                    <input
                              className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder='description'
                    type="text" value={editingRoom?.description} onChange={e => setEditingRoom({...editingRoom, description: e.target.value})} />
                    {/* <input type="text" value={editingRoom?.image} onChange={e => setEditingRoom({...editingRoom, image: e.target.value})} /> */}
                    <input
                              className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number" value={editingRoom?.price} onChange={e => setEditingRoom({...editingRoom, price: parseInt(e.target.value)})} />
                    <input type="file" multiple onChange={(e) => handleFileChange(Array.from(e.target.files))} />
                    {editingRoom?.images?.filter(e=> e!==null)?.map((image) => (
                        <div key={image}>
                            <img src={image} alt='room image' width={100} height={100}/>
                            <div className='text-right'>
                              <DeleteIcon
                              // className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-700'
                            onClick={() => handleDeleteImage(room.id, image)} />
                            </div>
                        </div>
                    ))}
                    <button 
                             className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700'
                    type='submit'>Save</button>
                    <button
                            className='focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-700'
                    type="button" onClick={() => {setEditingRoom(null); setSelectedFileEdit([])}}>Cancel</button>
                </form>
            ) : (
                <tbody className='w-full'>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    
                    >
                      <td className="px-6 py-4">{room?.name}</td>
                      <td className="px-6 py-4">{room?.price}</td>
                      <td className="px-6 py-4">{room?.description}</td>
                      <td className="px-6 py-4">
                        <button
                             className='focus:outline-none mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-700'
                    onClick={() => setEditingRoom(room)}>Edit</button>
                    <button
                             className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-700'

                    onClick={() => handleDeleteRoom(room?.name)}>Delete</button>
                    </td>
                    </tr>
                   
                    
                    {/* <div>
                      Availability: {room.available ? 'Available' : 'Not Available'}
                      <button onClick={() => handleUpdateAvailability(room?.name, !room?.available)}>
                          Toggle Availability
                      </button>
                  </div> */}
                </tbody>
            )}
          </li>
          
        ))}
        
        </table>
      </ul>
    </div>
    </div>
  );
};

export default RoomManager;