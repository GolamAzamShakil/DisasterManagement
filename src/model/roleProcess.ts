interface Person {
  id: number;
  email: string;
  userName: string;
  role: string;
}

// Function to convert JSON response to an array of objects
export function RoleProcess(jsonResponse: any): Person[] {
  try {
    if (Array.isArray(jsonResponse)) {
      return jsonResponse.map(
        (item: any): Person => ({
          id: item._id,
          email: item.email,
          userName: item.userName,
          role: item.role,
        })
      );
    } else {
      throw new Error("The JSON response is not an array.");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}

export default RoleProcess;
