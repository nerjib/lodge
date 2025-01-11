// HeroManager.js
import React, { useEffect, useState } from 'react';
import { baseUrl } from './services/config';
import { httpPost, httpPut } from './services/http';

const HeroManager = ({ onClose }) => {
    const [content, setHeroContent] = useState([])
    const [localHeroContent, setLocalHeroContent] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    

    const handleUpdateHeroContent = async () => {
        try {
            const res = await httpPut(`/api/v1/lodge/hero`, content);

        } catch (error) {
            console.error('Error updating hero content', error);
        }
    };

    const handleAddHeroContent = async () => {
        
            // const formData = new FormData();
            // formData.append('content', JSON.stringify(content));
            // // selectedFiles.forEach(file => formData.append('images', file));

            // const res = await fetch(`${baseUrl}/api/v1/lodge/hero`, {
            //     method: 'POST',
            //     body: formData,
            // });
            // if (!res.ok) throw new Error(`status: ${res.status}`);
            // const data = await res.json();
            // setHeroContent(data.content);
            // onClose();
            // setSelectedFiles([]);
        const res = await httpPost(`/api/v1/lodge/hero`, content);
       
    };

    const handleAddSlide = () => {
        setHeroContent(prev => [...prev, { title: '', description: '', image: '', isBeingUpdated: true }]);
    };

    const handleInputChange = (index, field, value) => {
        setHeroContent(prev => prev?.map((item, i) => i === index ? { ...item, [field]: value, isBeingUpdated: true } : item));
    };

    // const handleFileChange = (event) => {
    //     setSelectedFiles(Array.from(event.target.files));
    // };
    const handleFileChange = async (index, value) => {
        // setSelectedFile(event.target.files[0]);
        const formData = new FormData();
        if (value) {
            formData.append('images', value);
        }

        const res = await fetch(`${baseUrl}/api/v1/lodge/uploads`, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json()
        console.log({res: data});
        setHeroContent(prev => prev.map((item, i) => i === index ? { ...item, image: data?.imgUrl[0], isBeingUpdated: true } : item));
    };

    const handleDeleteSlide = (index) => {
        setHeroContent(prev => prev.filter((_, i) => i !== index))
    }
useEffect(() => {
  const fetchHeroContent = async () => {
      try {
          const res = await fetch(`${baseUrl}/api/v1/lodge/hero`);
          if (!res.ok) throw new Error(`status: ${res.status}`)
          const data = await res.json()
        console.log({ data })
          setHeroContent(data[0]?.content ?? [])
          setLocalHeroContent(data)
      } catch (error) {
          console.error('Error fetching hero data', error)
      }
  }

  fetchHeroContent()
}, [])
    return (
        <div className='hero-content-manager'>
            <div className='text-center'>
            <h2>Manage Hero Content</h2>
            </div>
            {content?.map((item, index) => (
                <div key={index} className='w-1/2 border p-2'>
                    <input 
                       className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text" placeholder="Title" value={item.title} onChange={(e) => handleInputChange(index, 'title', e.target.value)} />
                    <textarea
                      className="block p-2.5 w-full h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder='Description' value={item.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} />
                    <input type="file" onChange={(e) => handleFileChange(index, e.target.files[0])} />
                    <img src={item.image} alt={item.title} width={100} height={100}/>
                    <button
                        className='focus:outline-none my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                    type='button' onClick={() => handleDeleteSlide(index)}>Delete</button>
                </div>
            ))}
            <button
                className='focus:outline-none text-white bg-blue-700 hover:bg-bluee-800 focus:ring-4 focus:ring-bluee-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-700'
            onClick={handleAddSlide}>Add Slide</button>
            <button
            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700'
            onClick={localHeroContent.length > 0 ? handleUpdateHeroContent : handleAddHeroContent}>{localHeroContent.length >0 ? 'Update':'Save'}</button>
        </div>
    );
};

export default HeroManager;