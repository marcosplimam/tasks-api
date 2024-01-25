const url = "http://localhost:8080/task/user/1";

//Função pra esconder o loader
function hideLoader() {
    document.getElementById("loading").style.display = "none";
}

//Função que cria a tabela dinamicamente com uso de for
function show(tasks) {
    let tab = `
        <thead>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Username</th>
            <th scope="col">User ID</th>
        </thead>`;

    for (let task of tasks) {
        tab += `
            <tr>
                <td scope="row" class="font-weight-bold">${task.id}</td>
                <td scope="row">${task.description}</td>
                <td scope="row">${task.user.username}</td>
                <td scope="row">${task.user.id}</td>
            </tr>
        `;
    }

    document.getElementById("tasks").innerHTML = tab;
}

//Função assíncrona que faz fetch da URL
async function getAPI(url) {
    try {
        // Passo 1: Fazer um GET request utilizando o Fetch API
        const response = await fetch(url, { method: "GET" });

        // Passo 2: Checar se a response indica sucesso (HTTP status 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        // Step 3: Converter o response body para JSON
        const data = await response.json();

        if (!data) {
            throw new Error("Response body is empty or not valid JSON");
        }

        console.log(data);
        hideLoader();
        show(data);
    } catch (error) {
        console.error(error);
        // Manipular error, apresentando uma error message pro usuário
    }
}

// Chamar a função pra fazer o fetch e mostrar os dados na tabela
getAPI(url);
