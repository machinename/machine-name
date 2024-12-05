'use client';

import React, { useState } from 'react';
import styles from "../page.module.css";

export default function Upload() {
    const [modelName, setModelName] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!modelName || !file) {
            alert('Please provide a model name and file.');
            return;
        }

        // Simulate API call
        console.log('Uploading:', { modelName, file });
        alert('Model uploaded successfully!');
        setModelName('');
        setFile(null);
    };

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Upload Your Model</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="modelName" className={styles.label}>Model Name</label>
                    <input
                        type="text"
                        id="modelName"
                        className={styles.input}
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        placeholder="Enter your model name"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="file" className={styles.label}>Model File</label>
                    <input
                        type="file"
                        id="file"
                        className={styles.input}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>Upload</button>
            </form>
        </div>
    );
}
