import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ExperienceForm = ({ data, onChange }) => {

    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1);

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setGeneratingIndex(index)
        const experience = data[index]
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`


        try {
            const { data } = await api.post('/api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })
            updateExperience(index, "description", data.enhancedContent)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setGeneratingIndex(-1)
        }

    }



    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>

                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900 '>Professional Experience</h3>
                    <p className='text-sm text-gray-500'>Add your job experience</p>
                </div>
                <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-4"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add Experience
                </button>
            </div>


            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-12 h-12 mx-auto mb-3 text-gray-300"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
                    <p>No work experience added yet.</p>
                    <p className='text-sm'>Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3 '>

                                <input type='text' placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg border border-gray-600' value={experience.company || ""} onChange={(e) => updateExperience(index, "company", e.target.value)} />

                                <input type='text' placeholder='Job Title' className='px-3 py-2 text-sm rounded-lg border border-gray-600' value={experience.position || ""} onChange={(e) => updateExperience(index, "position", e.target.value)} />

                                <input type='month' className='px-3 py-2 text-sm rounded-lg border border-gray-600' value={experience.start_date || ""} onChange={(e) => updateExperience(index, "start_date", e.target.value)} />

                                <input type='month'
                                    disabled={experience.is_current}
                                    className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100 border border-gray-600' value={experience.end_date || ""} onChange={(e) => updateExperience(index, "end_date", e.target.value)} />
                            </div>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" checked={experience.is_current || false} onChange={(e) => { updateExperience(index, "is_current", e.target.checked ? true : false); }} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                <span className='text-sm text-gray-700'>
                                    Currently working here
                                </span>

                            </label>

                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium' >Job Description</label>
                                    <button
                                        onClick={() => generateDescription(index)}

                                        disabled={generatingIndex === index || !experience.position || !experience.company}
                                        className='flex item-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50 '>

                                        {generatingIndex === index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className='size-4 animate-spin'><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className='w-3 h-3'><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg>
                                        )}
                                        Enhance with AI
                                    </button>
                                </div>
                                <textarea rows={4} value={experience.description || ""} onChange={(e) => updateExperience(index, "description", e.target.value)} className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Describe your key responsibilities and achievements...' />

                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default ExperienceForm
