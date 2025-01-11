// HomeContentManager.js
import React, { useEffect, useState } from 'react';
import './App.css'; 
import { baseUrl } from './services/config';
import { hideLoader, showLoader } from '../utils/loader';
import { httpPost, httpPostFormData, httpPut } from './services/http';

const HomeContentManager = ({ onClose }) => {
  const [homeContent, setHomeContent] = useState({})
  const [welcome, setWelcome]= useState({});
  const [experience, setExperience] = useState([]);
  const [nExperience, setNExperience] = useState({});
  const [testimonials, setTestimonials]= useState([]);
  const [nTestimonial, setNTestimonials]= useState({});
  const [localHomeContent, setLocalHomeContent] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

    const handleUpdateHomeContent = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('content', JSON.stringify(localHomeContent));
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            const res = await fetch(`${baseUrl}/api/v1/lodge/home`, {
                method: 'PUT',
                body: formData,
            });
            if (!res.ok) throw new Error(`status: ${res.status}`);
            const data = await res.json();
            setHomeContent(data.content);
            onClose();
            setSelectedFile(null);
        } catch (error) {
            console.error('Error updating home content', error);
        } finally{
            setLoading(false)

        }
    };

    const handleAddParagraph = async() => {
        const res = await httpPost(`/api/v1/lodge/home/welcome`, {title: welcome?.title, paragraph: welcome?.paragraph});

    };

    const handleUpdateParagragh = async() => {

        const res = await httpPut(`/api/v1/lodge/home/welcome/${welcome?.id}`, {title: welcome?.title, paragraph: welcome?.paragraph});
        // try {
        //     // setLoading(true)
        //     // showLoader();
        //     const formData = new FormData();
        //     formData.append('title', welcome.title)
            
        //     const res = await fetch(`${baseUrl}/api/v1/lodge/home/welcome/${welcome?.id}`, {
        //         method: 'PUT',
        //         body: JSON.stringify({title: 1}),
        //     });
            
        //     if (!res.ok) throw new Error(`status: ${res.status}`);
        //     const data = await res.json();
        //     // se(data.content);
        //     onClose();
        //     setSelectedFile(null);
        // } catch (error) {
        //     console.error('Error updating home content', error);
        // } finally{
        //     setLoading(false)
        //     hideLoader();

        // }
    };


    // const handleParagraphChange = (index, value) => {
    //     setLocalHomeContent(prev => ({
    //         ...prev,
    //         welcome: {
    //             ...prev?.welcome,
    //             content: prev.welcome.content.map((p, i) => i === index ? value : p)
    //         }
    //     }));
    // };
     const handleParagraphChange = (value) => {
        setLocalHomeContent(prev => ({
            ...prev,
            welcome: {
                content: value
            }
        }));
    };

    const handleAddExperience = async () => {
        const res = await httpPost(`/api/v1/lodge/home/experience`, nExperience);
  
    };
    const handleupdateExperience = async (index) => {
        let updated = experience.filter((e, i)=> i===index )[0]
        console.log({updated});
        const res = await httpPut(`/api/v1/lodge/home/experience/${updated?.id}`, updated);

    };
    const handleupdateTestimony = async (index) => {
        let updated = testimonials.filter((e, i)=> i===index )[0]
        console.log({updated});
        const res = await httpPut(`/api/v1/lodge/home/testimony/${updated?.id}`, updated);

    };

    const handleExperienceChange = (index, field, value) => {
        setExperience(experience.map((exp, i) => i === index ? { ...exp, [field]: value, isBeingUpdated: true } : exp)
        );
    };

    // const handleFileChange = async (value) => {
    //     console.log({value})
    //     // setSelectedFile(event.target.files[0]);
    //     const formData = new FormData();
    //     if (value) {
    //         formData.append('images', value);
    //     }
    //     try{
    //         // setLoading(true)
    //         // showLoader();
        
    //     const res =await httpPostFormData('/api/v1/lodge/uploads', formData);
    //     console.log({res });
    //     setNExperience({...nExperience, image: res?.imgUrl})
    //     // setLocalHomeContent(prev => ({
    //     //     ...prev,
    //     //     experiences: prev.experiences.map((exp, i) => i === index ? { ...exp, image: data?.imgUrl, isBeingUpdated: true } : exp)
    //     // }));
    // }catch(err) {

    // }finally{
    //     setLoading(false)
    //     hideLoader()
    // }
    // };
    const handleFileChange = async (value) => {
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
            setNExperience({...nExperience, image: data?.imgUrl[0]})
            // setHeroContent(prev => prev.map((item, i) => i === index ? { ...item, image: data?.imgUrl[0], isBeingUpdated: true } : item));
        };

        const handleExFileChange = async (index, value) => {
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
            setExperience(experience.map((exp, i) => i === index ? { ...exp, image: data?.imgUrl[0], isBeingUpdated: true } : exp))

            // setHeroContent(prev => prev.map((item, i) => i === index ? { ...item, image: data?.imgUrl[0], isBeingUpdated: true } : item));
        };



    const handleAddTestimonial = async () => {
        // showLoader();
        const res = await httpPost(`/api/v1/lodge/home/testimony`, nTestimonial);
        // hideLoader();
    };

    const handleTestimonialChange = (index, field, value) => {
       
        setTestimonials(testimonials.map((exp, i) => i === index ? { ...exp, [field]: value, isBeingUpdated: true } : exp)
    );
    };

    const handleDeleteParagraph = (index) => {
        setLocalHomeContent(prev => ({
            ...prev,
            welcome: {
                ...prev.welcome,
                content: prev.welcome.content.filter((_, i) => i !== index)
            }
        }))
    }

    const handleDeleteExperience = (index) => {
        setLocalHomeContent(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }))
    }

    const handleDeleteTestimonial = (index) => {
        setLocalHomeContent(prev => ({
            ...prev,
            testimonials: prev?.testimonials?.filter((_, i) => i !== index)
        }))
    }
useEffect(() => {
    const fetchHomeContent = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/v1/lodge/home`)
            if (!res.ok) throw new Error(`status: ${res.status}`)
            const data = await res.json()
            console.log({ data})
            setWelcome(data?.data?.welcome[0]);
            setExperience(data?.data?.experience)
            setTestimonials(data?.data?.testimonials);
        } catch (error) {
            console.error('Error fetching home data', error)
            setError(error)
        } finally{
            setLoading(false)
        }
    }

    fetchHomeContent()
}, [])
if (loading) {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
}const handleFileChange2 = async (index, value) => {
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
        // setHeroContent(prev => prev.map((item, i) => i === index ? { ...item, image: data?.imgUrl, isBeingUpdated: true } : item));
    };
   
    return (
        <div className='home-content-manager'>
        <main className="ml-10">
            <div className='text-center'>
            <h2>Manage Home Content</h2>
            </div>
            <div>
                <h3>Welcome Section</h3>
                <input
                    className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text" placeholder="Title" value={welcome?.title} onChange={e => setWelcome({...welcome, title: e.target.value })} />
                {/* {localHomeContent?.welcome?.content?.map((p, index) => (
                    <div key={index}>
                        <textarea
                            className="block p-2.5 w-1/2 h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="Type here..."
                            value={p} onChange={e => handleParagraphChange(index, e.target.value)} />
                        <button
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                            type='button' onClick={() => handleDeleteParagraph(index)}>Delete</button>
                    </div>
                ))} */}
                 <div >
                    <textarea
                        className="block p-2.5 w-1/2 h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type here..."
                        value={welcome?.paragraph} onChange={e => setWelcome({...welcome, paragraph: e.target.value})} />
                    {/* <button
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                        type='button' onClick={() => handleDeleteParagraph(index)}>Delete</button> */}
                </div>
                <button onClick={welcome?.id ? () => handleUpdateParagragh() : handleAddParagraph}
                    className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700'
                >{welcome?.id ? 'Update' : 'Save'} Paragraph</button>
            </div>
            <div>
                <h3>Experiences</h3>
                {experience?.map((exp, index) => (
                    <div key={index} className='border my-2 w-1/2 p-2'>
                        <input
                        className='bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        type="text" placeholder="Title" value={exp.title} onChange={e => handleExperienceChange(index, 'title', e.target.value)} />
                        <textarea
                                className="block my-2 p-2.5 w-full h-[100px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Description' value={exp.paragraph} onChange={e => handleExperienceChange(index, 'paragraph', e.target.value)} />
                        <img src={exp.image} className='w-1/2' />

                        <input type="file" onChange={(e) => handleExFileChange(index, e.target.files[0])} />
                        
                        <button
                            className='focus:outline-none my-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900'
                            type='button' onClick={() => handleupdateExperience(index)}>Update</button>
                    
                        <button
                            className='focus:outline-none my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                            type='button' onClick={() => handleDeleteExperience(index)}>Delete</button>
                    </div>
                ))}
                <div className='border my-2 w-1/2 p-2'>
                        <input
                        className='bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        type="text" placeholder="Title" value={nExperience.title} onChange={e => setNExperience({...nExperience, title: e.target.value})} />
                        <textarea
                                className="block my-2 p-2.5 w-full h-[100px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Description' value={nExperience.paragraph} onChange={e => setNExperience({...nExperience, paragraph: e.target.value})} />
                        <img src={nExperience.image} className='w-1/2' />

                        {/* <input type="file" multiple onChange={(e) => handleFileChange(0, e.target.files[0])} /> */}
                        <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} />

                        {/* <button
                            className='focus:outline-none my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                            type='button' onClick={() => handleDeleteExperience()}>Delete</button> */}
                    </div>
                <button
                    className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700'                
                onClick={handleAddExperience}>Add Experience</button>
            </div>
            <div>
                <h3>Testimonials</h3>
                {testimonials?.map((test, index) => (
                    <div key={index} className='border my-2 p-2 w-1/2'>
                        <textarea
                            className="block p-2.5 w-full h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Quote' value={test?.description} onChange={e => handleTestimonialChange(index, 'description', e.target.value)} />
                        <input
                            className='bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        type="text"
                        placeholder="Author" value={test?.author} onChange={e => handleTestimonialChange(index, 'author', e.target.value)} />
                       <button
                            className='focus:outline-none my-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900'
                            type='button' onClick={() => handleupdateTestimony(index)}>Update</button>
                    
                        <button
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        type='button' onClick={() => handleDeleteTestimonial(index)}>Delete</button>
                    </div>
                ))}
                 <div className='border my-2 p-2 w-1/2'>
                        <textarea
                            className="block p-2.5 w-full h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Quote' value={nTestimonial.description} onChange={e => setNTestimonials({...nTestimonial, description: e.target.value})} />
                        <input
                            className='bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        type="text"
                        placeholder="Author" value={nTestimonial.author} onChange={e => setNTestimonials({...nTestimonial, author: e.target.value})} />
                        {/* <button
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        type='button' onClick={() => handleDeleteTestimonial(index)}>Delete</button>
                    </div> */}
                <button
                    className='focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-blue dark:hover:bg-green-blue dark:focus:ring-blue-700'
                    onClick={handleAddTestimonial}>Add Testimonial</button>
            </div>
            </div>
            <div className='text-center'>
            <button
                        className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700'
            onClick={handleUpdateHomeContent}>Save</button>
            </div>
            </main>
        </div>
    );
};

export default HomeContentManager;