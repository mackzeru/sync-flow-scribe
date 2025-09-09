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
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Header */}
      <div className="relative bg-card/90 backdrop-blur-md border-b border-border/50 shadow-medium">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Meeting Management System
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                iCog Sync Meetings
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Streamline your team meetings and track progress with intelligent conversation flows
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{demoMeetings.length} Active Meetings</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className="text-sm font-medium">This Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meetings Grid */}
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demoMeetings.map((meeting, index) => (
            <Card 
              key={meeting.id} 
              className="group hover:shadow-strong hover:-translate-y-2 transition-all duration-500 cursor-pointer border-border/30 hover:border-primary/30 bg-card/90 backdrop-blur-lg relative overflow-hidden"
              onClick={() => handleMeetingClick(meeting.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CardHeader className="pb-6 relative">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Meeting #{meeting.id}
                    </div>
                    <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight">
                      {meeting.title}
                    </CardTitle>
                  </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-0.5 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 relative">
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Date</p>
                      <p className="text-sm font-semibold">{new Date(meeting.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Time</p>
                      <p className="text-sm font-semibold">{meeting.time}</p>
                    </div>
                  </div>
                </div>

                {/* Agenda Preview */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-card-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Meeting Agenda
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 pl-4 border-l-2 border-primary/20">
                    {meeting.agenda}
                  </p>
                </div>

                {/* Tasks Count & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tasks to Review</p>
                      <p className="text-sm font-bold text-card-foreground">{meeting.tasks.length} Items</p>
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium px-4 py-2"
                  >
                    Start Review
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