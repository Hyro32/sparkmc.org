const BASE_URL = import.meta.env.API_URL;

// Resources
export async function createResource(resource: Resource): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

export async function getResource(url: string): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/resources/${url}`);
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

export async function getAllResources(): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/resources`);
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

export async function updateResource(resource: Resource): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/resources/${resource.url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

export async function deleteResource(url: string): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/resources/${url}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

// Users
export async function createUser(user: User): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

export async function getUser(username: string): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

export async function updateUser(user: User): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/users/${user.username}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}

export async function deleteUser(username: string): Promise<IResponse> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: null, status: 404 };
  }
}
