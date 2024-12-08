'use client'

import React from 'react';
import styles from '../page.module.css';
import MLModelModal from '../components/MLModelModal/MLModelModal';
import { MLModel } from '../models/MLModel';
import { Button } from '@mui/material';
import Link from 'next/link';

enum ModelStatus {
    Deployed = 'Deployed',
    Inactive = 'Inactive',
}

export default function Dashboard() {
    const [selectedModel, setSelectedModel] = React.useState<MLModel | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const models = [
        new MLModel('1', 'Image Classifier', ModelStatus.Deployed, {
            createdAt: '2023-01-01',
            version: '1.0',
            description: 'Classifies images into predefined categories.',
            usageCount: 100,
        }),
        new MLModel('2', 'Sentiment Analyzer', ModelStatus.Inactive, {
            createdAt: '2023-06-01',
            version: '1.1',
            description: 'Analyzes sentiment in textual data.',
            usageCount: 50,
        }),
    ];

    const handleDetails = (model: MLModel) => {
        setSelectedModel(model);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedModel(null);
    };

    return (
        <main className={styles.page}>
            <h2>Your Models</h2>
            {models.map((model) => (
                <div key={model.getId()} className={styles.container}>
                    <div>
                        <h3>{model.getName()}</h3>
                        <p>Status: {model.getStatus()}</p>
                    </div>
                    <Button
                        onClick={() => handleDetails(model)}
                    >
                        Details
                    </Button>
                </div>
            ))}

            <Link href="/upload" >
                Upload New Model
            </Link>
            {selectedModel && (
                <MLModelModal
                    isOpen={isModalOpen}
                    MLModel={selectedModel}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}
