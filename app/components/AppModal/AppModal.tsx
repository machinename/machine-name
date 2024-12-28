'use client'

import React from 'react';
import styles from './AppModal.module.css';
import { Paper } from '@mui/material';
// import Account from './Views/Account';
// import ModelSettings from './Views/ModelSettings';
import NewModel from './Views/NewModel';
import NewProject from './Views/NewProject';
import Projects from './Views/Projects';
// import ProjectSettings from './Views/ProjectSettings';

interface AppModalProps {
    appModalRef?: React.Ref<HTMLDivElement>;
    isOpen: boolean;
    view: string;
    onClose: () => void;
}

const AppModal: React.FC<AppModalProps> = ({
    appModalRef,
    isOpen,
    view,
    onClose
}) => {


    const renderView = () => {
        switch (view) {
            case 'account':
                return <p>Account</p>;
            case 'modelSettings':
                return <p>Model Settings</p>;
            case 'newModel':
                return <NewModel onClose={onClose}/>;
            case 'newProject':
                return <NewProject onClose={onClose}/>;
            case 'projects':
                return <Projects onClose={onClose}/>;
            case 'projectSettings':
                return <p>Project Settings</p>;
            default:
                return null;
        }
    };

    return (
        isOpen && (
            <div className={styles.modal}>
                <Paper ref={appModalRef} className={styles.wrapper}>
                    <div className={styles.container}>
                        {renderView()}
                    </div>
                </Paper>
            </div>
        )
    );
}
export default AppModal;