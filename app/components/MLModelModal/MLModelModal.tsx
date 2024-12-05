'use client'

import React from 'react';
import styles from './MLModelModal.module.css';
import { MLModel } from '../../models/MLModel';
import { Button } from '@mui/material';

interface MLModelModalProps {
    isOpen: boolean;
    MLModel: MLModel;
    onClose: (result: boolean) => void;
}

const MLModelModal: React.FC<MLModelModalProps> = ({ isOpen, onClose, MLModel }) => {
    if (!isOpen) return null;

    // const handleConfirm = (event: React.MouseEvent) => {
    //     event.preventDefault();
    //     onClose(true);
    // };

    const handleClose = (event: React.MouseEvent) => {
        event.preventDefault();
        onClose(false);
    };
    

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper}>
                <p>{MLModel.getName()}</p>
                <p>{MLModel.getStatus()}</p>
                <Button>View Metadata</Button>
                <Button onClick={handleClose}>Close</Button>
            </div>
        </div>
    );
}

export default MLModelModal;