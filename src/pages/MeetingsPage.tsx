import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { demoMeetings } from "@/data/meetings";
import { useNavigate } from "react-router-dom";

const MeetingsPage = () => {
  const navigate = useNavigate();

  const handleMeetingClick = (meetingId: string) => {
    navigate(`/conversation/${meetingId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                iCog Sync Meetings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your team meetings and track progress
              </p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {demoMeetings.length} Active Meetings
            </Badge>
          </div>
        </div>
      </div>

      {/* Meetings Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoMeetings.map((meeting) => (
            <Card 
              key={meeting.id} 
              className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50 bg-card/80 backdrop-blur-sm"
              onClick={() => handleMeetingClick(meeting.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {meeting.title}
                  </CardTitle>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Date & Time */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(meeting.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{meeting.time}</span>
                  </div>
                </div>

                {/* Agenda Preview */}
                <div>
                  <h4 className="text-sm font-medium text-card-foreground mb-1">Agenda</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {meeting.agenda}
                  </p>
                </div>

                {/* Tasks Count */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{meeting.tasks.length} Tasks</span>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="hover:bg-secondary-hover transition-colors"
                  >
                    Open Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingsPage;