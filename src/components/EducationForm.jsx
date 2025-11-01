import React from 'react'

const EducationForm = ({ data, onChange }) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",

        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>

                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900 '>Education</h3>
                    <p className='text-sm text-gray-500'>Add your education details</p>
                </div>
                <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-4"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add Education
                </button>
            </div>


            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-12 h-12 mx-auto mb-3"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>
                    <p>No work education added yet.</p>
                    <p className='text-sm'>Click "Add Education" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((education, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Education #{index + 1}</h4>
                                <button onClick={() => removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3 '>

                                <input type='text' placeholder='institution name' className='px-3 py-2 text-sm border border-gray-600' value={education.institution || ""} onChange={(e) => updateEducation(index, "institution", e.target.value)} />

                                <input type='text' placeholder="degree (e.g., Bachelor's, Master)" className='px-3 py-2 text-sm border border-gray-600' value={education.degree || ""} onChange={(e) => updateEducation(index, "degree", e.target.value)} />

                                <input type='text' className='px-3 py-2 text-sm border border-gray-600' value={education.field || ""} onChange={(e) => updateEducation(index, "field", e.target.value)} placeholder='Field of study' />

                                <input type='month'
                                className='px-3 py-2 text-sm border border-gray-600' value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} />

                            </div>

                                <input type='text' className='px-3 py-2 text-sm border border-gray-600 ' value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} placeholder='gpa(is optional)' />

                           
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default EducationForm
