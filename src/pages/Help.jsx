import Card from '../components/ui/Card.jsx';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="p-6 max-w-xl w-full">
        <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Support</h2>
        <p className="mt-2 text-on-surface-variant font-medium">
          Demo app support page. Add real help links later.
        </p>
        <div className="mt-6 space-y-2 text-sm text-on-surface">
          <div>
            <span className="font-extrabold">Docs:</span> Coming soon
          </div>
          <div>
            <span className="font-extrabold">Email:</span> support@demo.com
          </div>
        </div>
      </Card>
    </div>
  );
}

