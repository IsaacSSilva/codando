interface Commit {
  hash: string;
  message: string;
  author: string;
  date: string; // ISO string
}

interface CommitItemProps {
  commit: Commit;
}

export default function CommitItem({ commit }: CommitItemProps) {
  const shortHash = commit.hash.slice(0, 7);
  const formattedDate = new Date(commit.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-200 rounded">
      {/* Ícone de commit vira o "gatilho" do hover */}
      <div className="flex-shrink-0 mt-1 group relative">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {/* Conteúdo do commit */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="font-medium text-gray-800">{commit.author}</span>
          <span className="font-mono">{shortHash}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
        <div className="mt-1 text-gray-900">{commit.message}</div>
      </div>
    </div>
  );
}
