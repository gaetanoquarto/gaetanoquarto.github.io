import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.interface';

@Component({
    selector: 'app-filtered-pc',
    templateUrl: './filtered-pc.component.html',
    styleUrls: ['./filtered-pc.component.scss']
})
export class FilteredPcComponent implements OnInit {

    sub!: Subscription;
    posts: Post[] | undefined;

    constructor(private pstSrv: PostsService) { }

    ngOnInit(): void {
        this.getLastThreePC();
    }

    getLastThreePC() {
        this.sub = this.pstSrv.getCategoryPosts('pc').subscribe((post) => {
            this.posts = post.slice(-3).reverse();
        })
    }

}
