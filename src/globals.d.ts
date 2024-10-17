declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string | undefined; callback: (response: any) => void }) => void;
        };
      };
    };
  }
}

export {};