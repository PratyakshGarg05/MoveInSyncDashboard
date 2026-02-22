import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RuleConfig from './RuleConfig';
import { AlertProvider } from '../context/AlertContext';

describe('RuleConfig Component', () => {
    it('renders the Rule Configuration header', () => {
        render(
            <AlertProvider>
                <RuleConfig />
            </AlertProvider>
        );
        
        expect(screen.getByText('Rule Configuration')).toBeInTheDocument();
        expect(screen.getByText('Active Escalation Rules')).toBeInTheDocument();
    });

    it('renders the rules table', () => {
        render(
            <AlertProvider>
                <RuleConfig />
            </AlertProvider>
        );
        
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('Overspeeding Limit')).toBeInTheDocument();
    });
});