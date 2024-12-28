'use client';

import { Add, SearchOutlined } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import ModelList from "./components/ModelList/ModalList";
import { OutlinedTextField, StyledButton } from "./components/Styled";
import styles from "./page.module.css";
import { useRef } from "react";
import React from "react";
import { useAppContext } from "./providers/AppProvider";

export default function Home() {

  const { currentProject,
    //  handleSetCurrentProject,
    user, setAppModalView } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProject = () => {
    setAppModalView('projects');
  };

  const handleNewModel = () => {
    setAppModalView('newModel');
  };

  const handleSearchIconButton = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const ProjectView = () => {
    return (
      <React.Fragment>
        <div className={styles.pageHeader}>
          <h1>Welcome</h1>
          {
            currentProject 
              ? 
              <h3>
                <button
                type="button"
                onClick={handleProject}
                className={styles.projectTextButton}
                >You&apos;re working in {currentProject.getName()}
              </button>
            </h3>
              :
              <h3>
                <button
                  type="button"
                  onClick={handleProject}
                  className={styles.projectTextButton}>
                  Select a project to get started
                </button>
              </h3>
          }
        </div>
        <div className={styles.modelsHeader}>
          <div className={styles.modelsHeaderLeading}>
            <h2>Models</h2>
            <StyledButton
              onClick={handleNewModel} startIcon={<Add />}>New Model</StyledButton>
          </div>
        </div>
        <div className={styles.modelsContainer}>
          <OutlinedTextField
            inputRef={inputRef}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ cursor: 'pointer' }} onClick={handleSearchIconButton}>
                    <SearchOutlined />
                  </InputAdornment>
                ),
              },
            }}
            // type={showPassword ? 'text' : 'password'}
            size='small'
            id="confirmPassword"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            label="Search models"
            sx={{
              // width: 'calc(100% - 1rem)',
              width: '100%',
            }}
          />
          <ModelList />
        </div>
      </React.Fragment>
    );
  };

  const WelcomeView = () => {
    return (
      <React.Fragment>

      </React.Fragment>
    );
  };

  return (
    <main className={styles.page}>
      {user ? <ProjectView /> : <WelcomeView />}
    </main>
  );
}