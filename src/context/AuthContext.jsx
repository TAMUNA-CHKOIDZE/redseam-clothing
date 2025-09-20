import React, { createContext, useState, useEffect } from "react";

// კონტექსტის შექმნა
export const AuthContext = createContext();

// AuthProvider კომპონენტი არის აპის ვრაპერი (გაახვევს აპლიკაციას) და ავტორიზაციის მდგომარეობას უზრუნველყოფს.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ვამოწმებ არსებობს თუ არა მომხმარებლის მონაცემები localStorage-ში და თუ კი ვსეტავ.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // მომხმარებლის დალოგინების ფუნქცია: სეტავს მომხმარებლის მდგომარეობას და ინახავს localStorage-ში
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  // მომხმარებლის logout-ის ფუნქცია: მომხმარებლის მდგომარეობას ასუფთავებს და შლის localStorage-დან 
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    // App-დან ინფორმაციას აწვდის მთლიან აპლიკაციას user-ის, isAuthenticated: !!user-ის, login-ის და logout-ის შესახებ
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
