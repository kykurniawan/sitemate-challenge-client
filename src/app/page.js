import IssueList from "@/components/issue/IssueList";

export default function Home() {
  return (
    <>
      <header className="bg-sky-700 py-3">
        <div className="container mx-auto px-5">
          <h1 className="text-gray-100 font-bold">Isssue App</h1>
        </div>
      </header>
      <div className="container mx-auto px-5">
        <main>
          <IssueList />
        </main>
      </div>
    </>
  );
}
