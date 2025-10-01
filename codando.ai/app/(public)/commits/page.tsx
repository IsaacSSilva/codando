// app/commits/page.tsx
async function getCommitsSince(days: number) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const query = `
    query($since: GitTimestamp!) {
      viewer {
        repositories(first: 20, ownerAffiliations: OWNER) {
          nodes {
            name
            defaultBranchRef {
              target {
                ... on Commit {
                  history(since: $since, first: 20) {
                    edges {
                      node {
                        message
                        committedDate
                        url
                        author {
                          name
                          user {
                            login
                            avatarUrl
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { since } }),
    next: { revalidate: 60 }, // cache leve de 1 min
  });

  if (!res.ok) throw new Error("Erro ao buscar commits");
  return res.json();
}

export default async function CommitsPage() {
  const data = await getCommitsSince(60); // últimos 7 dias
  const repos = data?.data?.viewer?.repositories?.nodes ?? [];

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Commits dos últimos 7 dias (todos os repositórios)
      </h1>

      {repos.map((repo: any) => {
        const edges = repo.defaultBranchRef?.target?.history?.edges ?? [];

        // inverter pra mostrar mais velhos por último
        const commits = edges.slice().reverse();

        if (commits.length === 0) return null;

        return (
          <section key={repo.name} className="mb-8">
            <h2 className="text-lg font-semibold mb-2">{repo.name}</h2>
            <ul className="space-y-2">
              {commits.map((edge: any) => {
                const c = edge.node;
                return (
                  <li key={c.url} className="p-3 border rounded-lg shadow-sm">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {c.message}
                    </a>
                    <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      {c.author?.user && (
                        <img
                          src={c.author.user.avatarUrl}
                          alt={c.author.user.login}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span>{c.author?.name ?? "Autor desconhecido"}</span>
                      <span>
                        • {new Date(c.committedDate).toLocaleString()}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
