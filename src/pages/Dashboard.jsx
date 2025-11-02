import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editResume, setEditResume] = useState(null);
  const [allResumes, setAllResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch resumes
  const fetchResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Create Resume
  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ✅ Fixed Upload Resume (no pdfToText needed)
  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!file) throw new Error("Please select a PDF file");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      const { data } = await api.post("/api/ai/upload-resume", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setFile(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit Resume
  const handleEdit = (resume) => {
    setEditResume(resume._id);
    setTitle(resume.title);
    setShowEditModal(true);
  };

  const saveEditedResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId: editResume,
          resumeData: { title },
          removeBG: false,
        },
        {
          headers: { Authorization: token },
        }
      );

      setAllResumes((prev) =>
        prev.map((r) => (r._id === editResume ? { ...r, title } : r))
      );
      setTitle("");
      setEditResume(null);
      setShowEditModal(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Delete Resume
  const handleDelete = async (resumeId) => {
    try {
      if (window.confirm("Are you sure you want to delete this resume?")) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((r) => r._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-semibold mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
        Welcome, {user.name}
      </p>

      {/* Create & Upload Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowCreateResume(true)}
          className="group w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-all duration-300"
        >
          <svg
            className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-indigo-300 to-indigo-500 text-white rounded-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <p className="text-sm font-semibold group-hover:text-indigo-500 transition-all duration-300">
            Create Resume
          </p>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="group w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 transition-all duration-300"
        >
          <svg
            className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-purple-300 to-purple-500 text-white rounded-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 13v8" />
            <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
            <path d="m8 17 4-4 4 4" />
          </svg>
          <p className="text-sm font-semibold group-hover:text-purple-500 transition-all duration-300">
            Upload Existing
          </p>
        </button>
      </div>

      <hr className="my-8 border-t border-gray-300" />

      {/* Resume Cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
        {allResumes.map((resume, index) => {
          const basecolor = colors[index % colors.length];
          return (
            <div
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:max-w-36 h-52 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${basecolor}10, ${basecolor}40)`,
                borderColor: basecolor + "40",
              }}
            >
              <p className="text-black font-bold text-sm">{resume.title}</p>
              <p className="text-[11px] text-gray-600 font-semibold">
                Updated: {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(resume);
                  }}
                  className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(resume._id);
                  }}
                  className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border shadow-lg rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="w-full border px-4 py-2 rounded mb-4"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Create Resume
            </button>
          </div>
        </form>
      )}

      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border shadow-lg rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Upload Existing Resume</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="w-full border px-4 py-2 rounded mb-4"
              required
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border px-4 py-2 rounded mb-4"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin size-4 text-white"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {isLoading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </form>
      )}

      {showEditModal && (
        <form
          onSubmit={saveEditedResume}
          onClick={() => setShowEditModal(false)}
          className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border shadow-lg rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new title"
              className="w-full border px-4 py-2 rounded mb-4"
              required
            />
            <button className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
