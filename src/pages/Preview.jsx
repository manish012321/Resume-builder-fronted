import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ResumePreview from '../components/ResumePreview';
import Loader from '../components/Loader';
import api from '../configs/api';

const Preview = () => {

  const{ resumeId } = useParams();
  const [isLoading , setIsLoading] = useState(true);

  const[resumeData , setResumeData] = useState(null);

  const loadResume = async () => {
    try {
      const {data} = await api.get('/api/resumes/public/' + resumeId )
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  

  useEffect(()=>{
    loadResume()
  },[])

  return resumeData ? (
    <div className='bg-slate-100'>
    <div className='max-w-3xl mx-auto py-10'>
    <ResumePreview  data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} classes='py-4 bg-white'/>
    </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
          <a href='/' className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 transition-colors flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className='mr-2 size-4'><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>Go to Homepage
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview
