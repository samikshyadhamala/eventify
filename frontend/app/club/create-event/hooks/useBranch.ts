import {Branch} from '../types'
import React from 'react';

export const useBranches = (axiosInstance: any, toast: any) => {
    const [branches, setBranches] = React.useState<Branch[]>([]);
  
    React.useEffect(() => {
      const fetchBranches = async () => {
        try {
          const response = await axiosInstance.get('/api/branch/getUniqueBranches');
          setBranches(response.data.branches);
        } catch (error) {
          console.error('Error fetching branches:', error);
          toast({
            title: "Error",
            description: "Failed to load branches. Please refresh the page.",
            variant: "destructive"
          });
        }
      };
  
      fetchBranches();
    }, [axiosInstance, toast]);
  
    return branches;
  };