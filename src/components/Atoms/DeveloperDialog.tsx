import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Linkedin, Globe } from "lucide-react";
import devImg from "@/assets/me-Developer.png";

interface DeveloperDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeveloperDialog: React.FC<DeveloperDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-2">
          <DialogTitle>About &lt;Pranjal Goyal&gt;</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex items-center space-x-4 m-1 p-1">
            <img
              className="rounded-full w-32"
              src={devImg}
              alt="Developer Image"
            />
            <div>
              <p className="text-sm text-muted-foreground text-left">
                Passionate software developer with a keen interest in creating
                innovative solutions. Committed to continuous learning and
                delivering high-quality technical work.
              </p>
            </div>
          </div>
          <div className="flex justify-between flex-wrap mt-4 space-x-2">
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://github.com/pranjal7852", "_blank")
              }
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://pranjalgoyal.dev/", "_blank")}
              className="flex items-center gap-2"
            >
              <Globe className="h-5 w-5" />
              Website
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/pranjal-goyal-42a7a55b/",
                  "_blank"
                )
              }
              className="flex items-center gap-2"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </Button>
          </div>
          <div className="text-xs text-muted-foreground text-center mt-4">
            Special thanks to DPS for providing this opportunity and assignment.
          </div>
        </div>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default DeveloperDialog;
