import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EditorHubService } from '../../_services/editor-hub.service';
import { RoomService } from '../../_services/room.service';

interface comment {
  id: number,
  text: string,
  dateTime: Date,
  userId: number,
  username: string,
  mindMapId: number
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {

  mapId: number;
  comments: comment[] = [];

  commentAddedSub: Subscription;
  commentRemovedSub: Subscription;

  newComment = false;
  text: string;

  constructor(private route: ActivatedRoute,
    private roomService: RoomService,
    private editorHubService: EditorHubService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.mapId = + this.route.snapshot.paramMap.get('id');
    const req = this.roomService.getComments(this.mapId);
    req.subscribe((response) => {
      const comments = response as Array<comment>;
      comments.forEach(comment => {
        this.comments.push(comment);
      })
      
    })
    await req;

    this.commentAdded();
    this.commentRemoved();
  }

  ngOnDestroy() {
    this.commentAddedSub.unsubscribe();
    this.commentRemovedSub.unsubscribe();
  }

  addComment() {
    console.log(this.text);
    this.editorHubService.addComment(this.text, this.mapId, 1);
    this.newComment = false;
  }
  removeComment(commentId: number) {
    this.editorHubService.deleteComment(commentId, this.mapId);
    // this.comments = this.comments.filter(c => c.id !== commentId);
  }

  commentAdded() {
    this.commentAddedSub = this.editorHubService.commentAdded.subscribe((obj) => {
      this.comments.push(obj as comment);
    })
  }

  commentRemoved() {
    this.commentRemovedSub = this.editorHubService.commentRemoved.subscribe((obj) => {
      this.comments = this.comments.filter(c => c.id !== obj as number);
    })
  }

}
