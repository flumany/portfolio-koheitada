import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'in' | 'out'>('loading');

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'in' : 'out');
    });
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'in' : 'out');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">読み込み中...</div>;
  }
  if (status === 'out') {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
