import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
@Component({
    selector: 'api-view',
    templateUrl: './app.apiView.html'
})
export class ApiViewComponent implements OnInit {
    public remote;
    public apiId;
    public api;
    public spec;
    public loadView;
    public info;
    public baseUrl;
    public alert;
    public alertMessage;
    public event;
    public update;
    public eventExample;
    constructor(private http: Http, private route: ActivatedRoute) {
        if (window["config"] && window["config"].domain) {
            this.baseUrl = window["config"].domain;
        }
        else {
            this.baseUrl = window.location.origin;
        }
        this.info = window["info"]
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.apiId = params.id;
            this.remote = params.remote == "true";
            this.update = params.update == "true";
            if (this.remote) {
                this.http.get(this.baseUrl + this.info.links.remoteApis + "/" + this.apiId)
                    .subscribe(
                        success => {
                            this.fillSpec(success);
                        },
                        error => {
                            this.alertMessage = error;
                            this.alert = true;
                        });
            }
            else {
                this.http.get(this.baseUrl + this.info.links.localApis + "/" + this.apiId)
                    .subscribe(
                        success => {
                            this.fillSpec(success);
                        },
                        error => {
                            this.alertMessage = error;
                            this.alert = true;
                        });
            }

        });
    }

    private fillSpec(data) {
        this.api = JSON.parse(data["_body"]);
        if (this.api.events) {
            this.spec = JSON.stringify(this.api, null, '\t');
            this.event = true;
        }
        else {
            this.spec = JSON.stringify(this.api, null, '\t');
        }
        this.loadView = true;
    }
    public closeAlert() {
        this.alert = false;
    }
}
