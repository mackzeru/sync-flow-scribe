import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, XCircle, MessageSquare, Calendar, Clock } from "lucide-react";
import { demoMeetings, Task } from "@/data/meetings";
import { useToast } from "@/hooks/use-toast";
import { generateMeetingSummary } from "@/util/aiSummary";

interface TaskResponse {
  taskId: string;
  completed: boolean;
  reason: string;
}

const ConversationPage = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [meeting, setMeeting] = useState(demoMeetings.find(m => m.id === meetingId));
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskResponses, setTaskResponses] = useState<TaskResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<boolean | null>(null);
  const [currentReason, setCurrentReason] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    if (!meeting) {
      navigate('/');
      return;
    }
  }, [meeting, navigate]);

  const handleStartMeeting = () => {
    setMeetingStarted(true);
    toast({
      title: "Meeting Started",
      description: "Beginning task review process...",
    });
  };

  const handleTaskAnswer = (completed: boolean) => {
    setCurrentAnswer(completed);
  };

  const handleSubmitTaskResponse = () => {
    if (currentAnswer === null || !currentReason.trim()) {
      toast({
        title: "Incomplete Response",
        description: "Please answer the question and provide details.",
        variant: "destructive",
      });
      return;
    }

    const response: TaskResponse = {
      taskId: meeting!.tasks[currentTaskIndex].id,
      completed: currentAnswer,
      reason: currentReason,
    };

    setTaskResponses([...taskResponses, response]);
    setCurrentAnswer(null);
    setCurrentReason("");

    if (currentTaskIndex < meeting!.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      generateAISummary([...taskResponses, response]);
    }
  };



  const generateAISummary = async (responses: TaskResponse[]) => {
    toast({
      title: "Generating Summary",
      description: "AI is analyzing responses...",
    });
  
    try {
      const summary = await generateMeetingSummary(meeting!, responses);
  
      setAiSummary(summary);
      setShowSummary(true);
  
      toast({
        title: "Summary Generated",
        description: "Meeting analysis complete!",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to generate AI summary",
        variant: "destructive",
      });
    }
  };
  

  if (!meeting) return null;

  const currentTask = meeting.tasks[currentTaskIndex];
  const progress = meetingStarted ? ((currentTaskIndex + (currentAnswer !== null ? 0.5 : 0)) / meeting.tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Header */}
      <div className="relative bg-card/90 backdrop-blur-md border-b border-border/50 shadow-strong">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/')}
                className="hover:bg-secondary-hover hover:scale-105 transition-all duration-200 px-4 py-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Meetings
              </Button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    Meeting #{meeting.id}
                  </div>
                  {meetingStarted && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      In Progress
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {meeting.title}
                </h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(meeting.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {meeting.time}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {meetingStarted && (
            <div className="mt-8 bg-card/50 rounded-xl p-6 backdrop-blur-sm border border-border/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">Meeting Progress</p>
                    <p className="text-sm text-muted-foreground">Task review in progress</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
              <Progress value={progress} className="h-3 bg-secondary/50" />
              <p className="text-xs text-muted-foreground mt-2">
                {currentTaskIndex + 1} of {meeting.tasks.length} tasks reviewed
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        {!meetingStarted ? (
          /* Meeting Overview */
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Meeting Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Agenda</h3>
                    <p className="text-muted-foreground">{meeting.agenda}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Updates</h3>
                    <p className="text-muted-foreground">{meeting.updates}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Decisions</h3>
                    <p className="text-muted-foreground">{meeting.decisions}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Blockers</h3>
                    <p className="text-muted-foreground">{meeting.blockers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Tasks to Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meeting.tasks.map((task, index) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border border-border/50 rounded-md">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Assigned to {task.assignee} • Due {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">{index + 1}</Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={handleStartMeeting} 
                    size="lg"
                    className="bg-primary hover:bg-primary-hover text-primary-foreground px-8"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : showSummary ? (
          /* AI Summary */
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-center text-primary">
                  Meeting Summary Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-card-foreground">
                    {aiSummary}
                  </pre>
                </div>
                
                <div className="mt-6 flex justify-center gap-4">
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/')}
                  >
                    Back to Meetings
                  </Button>
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(aiSummary);
                      toast({
                        title: "Copied!",
                        description: "Summary copied to clipboard",
                      });
                    }}
                  >
                    Copy Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Task Q&A Flow */
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Task Review</CardTitle>
                  <Badge variant="outline">
                    {currentTaskIndex + 1} of {meeting.tasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-secondary/50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{currentTask.title}</h3>
                  <p className="text-muted-foreground">
                    Assigned to {currentTask.assignee} • Due {new Date(currentTask.deadline).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-medium mb-4">Was this task completed?</h4>
                  
                  <div className="flex justify-center gap-4 mb-6">
                    <Button
                      variant={currentAnswer === true ? "default" : "outline"}
                      onClick={() => handleTaskAnswer(true)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Yes, Completed
                    </Button>
                    <Button
                      variant={currentAnswer === false ? "default" : "outline"}
                      onClick={() => handleTaskAnswer(false)}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      No, Not Completed
                    </Button>
                  </div>
                </div>

                {currentAnswer !== null && (
                  <div className="space-y-4">
                    <Separator />
                    <div>
                      <label className="text-sm font-medium">
                        {currentAnswer ? "Did you face any challenges?" : "Why was it not completed?"}
                      </label>
                      <textarea
                        value={currentReason}
                        onChange={(e) => setCurrentReason(e.target.value)}
                        className="w-full mt-2 p-3 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={3}
                        placeholder="Provide details..."
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmitTaskResponse}
                      disabled={!currentReason.trim()}
                      className="w-full"
                    >
                      {currentTaskIndex < meeting.tasks.length - 1 ? "Next Task" : "Generate Summary"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;