'use client';

import { app } from "@/configs/app";
import { useState, useEffect } from "react";

const IssueList = () => {
    const [issues, setIssues] = useState([]);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        getIssues();
    }, []);

    const getIssues = async () => {
        const response = await fetch(app.apiUrl + "/issues");
        const data = await response.json();

        setIssues(data);
    };

    const handleSubmitIssue = async (e) => {
        e.preventDefault();
        if (id) {
            await fetch(app.apiUrl + "/issues/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            });
        } else {
            await fetch(app.apiUrl + "/issues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            });
        }

        setTitle("");
        setDescription("");
        setId("");
        getIssues();
    };

    const deleteIssue = async (id) => {
        await fetch(app.apiUrl + "/issues/" + id, {
            method: "DELETE",
        });

        getIssues();
    };

    const fillFormForEdit = async (id) => {
        const response = await fetch(app.apiUrl + "/issues/" + id);
        const data = await response.json();

        setId(data.id);
        setTitle(data.title);
        setDescription(data.description);
    }

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setId("");
    };

    return (
        <div className="py-10">
            <div className="mb-5 border bg-gray-50 p-4 shadow">
                <h2 className="text-lg font-bold mb-5">
                    {id ? "Edit Issue" : "Add Issue"}
                </h2>
                <form onSubmit={handleSubmitIssue}>
                    <input type="hidden" value={id} />
                    <div className="mb-3">
                        <label className="block text-sm font-bold mb-2" htmlFor="title">Title</label>
                        <input required onChange={(e) => setTitle(e.target.value)} value={title} className="w-full px-3 py-2 border" type="text" id="title" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea required onChange={(e) => setDescription(e.target.value)} value={description} className="w-full px-3 py-2 border" id="description"></textarea>
                    </div>
                    <button type="submit" className="bg-sky-700 text-white px-4 py-1 rounded">Save</button>
                    {(id || title || description) && (
                        <button onClick={() => resetForm()} type="button" className="bg-red-700 text-white px-4 py-1 rounded ml-2">Reset Form</button>
                    )}
                </form>
            </div>
            <h2 className="text-lg font-bold mb-5">Issues</h2>
            <div className="grid grid-cols-3 gap-4">
                {issues.map((issue) => (
                    <div key={issue.id} className="bg-gray-50 shadow border p-4">
                        <div className="mb-3">
                            <h3 className="text-lg font-bold">{issue.title}</h3>
                            <p className="text-sm text-gray-500">{issue.description}</p>
                        </div>
                        <hr />
                        <div className="flex justify-end mt-3">
                            <button onClick={() => fillFormForEdit(issue.id)} className="bg-sky-700 text-white px-4 py-1 rounded">Edit</button>
                            <button onClick={() => deleteIssue(issue.id)} className="bg-red-700 text-white px-4 py-1 rounded ml-2">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IssueList