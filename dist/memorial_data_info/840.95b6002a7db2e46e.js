"use strict";(self.webpackChunkMemorial_Data_Info=self.webpackChunkMemorial_Data_Info||[]).push([[840],{1840:(U,v,i)=>{i.r(v),i.d(v,{AuthModule:()=>f});var a=i(6895),l=i(9116),t=i(4650);class u{constructor(){}ngOnInit(){}static#t=this.\u0275fac=function(e){return new(e||u)};static#e=this.\u0275cmp=t.Xpm({type:u,selectors:[["app-auth"]],decls:1,vars:0,template:function(e,s){1&e&&t._UZ(0,"router-outlet")},dependencies:[l.lC],encapsulation:2})}var o=i(433),b=i(7579),y=i(2722),A=i(590),c=i(6468),Z=i(1893),_=i(7576),h=i(594),x=i(1974),w=i(117),m=i(1115),T=i(9367);function F(r,n){if(1&r&&(t.ynx(0),t.TgZ(1,"div",20)(2,"span",21),t._uU(3),t.qZA()(),t.BQk()),2&r){const e=t.oxw().message;t.xp6(3),t.hij(" ",e," ")}}function C(r,n){if(1&r&&t.YNc(0,F,4,1,"ng-container",19),2&r){const e=n.control;t.Q6J("ngIf",e.hasError(n.validation)&&(e.dirty||e.touched))}}const L=function(r){return{validation:"required",message:"Email is required to login",control:r}},O=function(r){return{validation:"required",message:"Password is required to login",control:r}};class g{constructor(n,e,s){this.auth=n,this.router=e,this.notif=s,this.isSigningIn=new b.x,this.destroy$=new b.x,this.initloginForm(),(this.auth.currentUserValue||(0,c.YX)(c.MX.GuestSession))&&this.router.navigate(["/user/userListing"])}get f(){return this.loginForm.controls}initloginForm(){this.loginForm=new o.cw({email:new o.NI(null,o.kI.required),password:new o.NI(null,o.kI.required)})}onSubmit(){if(this.loginForm.invalid)return this.loginForm.markAllAsTouched();this.isSigningIn.next(!0),this.auth.login(this.loginForm.value).pipe((0,y.R)(this.destroy$),(0,A.P)()).subscribe(n=>{n?(this.isSigningIn.next(!1),this.notif.displayNotification("You have logged in successfully","User Login","success"),this.router.navigate(["/user/userListing"])):this.isSigningIn.next(!1)})}guestSession(){this.auth.loginAsGuest(),(0,c.YX)(c.MX.GuestSession)&&(this.notif.displayNotification("Your guest session has been created","User Login","success"),this.router.navigate(["/user/userListing"]))}ngOnDestroy(){this.destroy$.complete(),this.destroy$.unsubscribe()}static#t=this.\u0275fac=function(e){return new(e||g)(t.Y36(Z.e),t.Y36(l.F0),t.Y36(_.T))};static#e=this.\u0275cmp=t.Xpm({type:g,selectors:[["ng-component"]],decls:29,vars:15,consts:[[1,"h-screen"],[1,"container","h-full","px-6","py-24"],[1,"flex","flex-wrap","items-center","justify-center","h-full","g-6","lg:justify-between"],[1,"mb-12","md:mb-0","md:w-8/12","lg:w-6/12"],["src","../../../../assets/Memorial Data Info.png","alt","Phone image",1,"w-full"],[1,"w-full","md:w-8/12","lg:ml-6","lg:w-5/12"],[3,"formGroup"],["data-te-input-wrapper-init","",1,"relative","mb-6"],[1,"block","pb-2","text-sm","font-bold"],["tuiTextfieldSize","l","formControlName","email",3,"tuiTextfieldLabelOutside","tuiTextfieldCleaner"],["tuiTextfield","","type","email"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["formControlName","password","tuiTextfieldSize","l",3,"tuiTextfieldLabelOutside"],["tuiTextfield",""],["tuiButton","","type","submit","appearance","custom",1,"inline-block","w-full","bg-[#3F3D56]","text-white",3,"showLoader","click"],[1,"my-4","flex","items-center","before:mt-0.5","before:flex-1","before:border-t","before:border-neutral-300","after:mt-0.5","after:flex-1","after:border-t","after:border-neutral-300"],[1,"mx-4","mb-0","font-semibold","text-center","dark:text-neutral-200"],["role","button","data-te-ripple-init","","data-te-ripple-color","light",1,"mb-3","flex","w-full","items-center","justify-center","rounded","bg-[#AAC7FA]","px-7","pt-3","pb-2.5","text-center","text-sm","font-semibold","uppercase","leading-normal","text-[#3F3D56]","shadow-[0_4px_9px_-4px_#3b71ca]","transition","duration-150","ease-in-out","hover:bg-primary-600","hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]","focus:bg-primary-600","focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]","focus:outline-none","focus:ring-0","active:bg-primary-700","active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]",2,"background-color","#AAC7FA",3,"click"],["formError",""],[4,"ngIf"],[1,"w-full","mt-1","text-left","fv-plugins-message-container","text-xxs","2xl:text-xs"],["role","alert",1,"text-xs","font-semibold","text-red-700","fv-help-block"]],template:function(e,s){if(1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5)(6,"form",6)(7,"div",7)(8,"label",8),t._uU(9,"Email"),t.qZA(),t.TgZ(10,"tui-input",9),t._UZ(11,"input",10),t.qZA(),t.GkF(12,11),t.qZA(),t.TgZ(13,"div",7)(14,"label",8),t._uU(15,"Password"),t.qZA(),t.TgZ(16,"tui-input-password",12),t._UZ(17,"input",13),t.qZA(),t.GkF(18,11),t.qZA(),t.TgZ(19,"button",14),t.NdJ("click",function(){return s.onSubmit()}),t.ALo(20,"async"),t._uU(21," Sign In "),t.qZA(),t.TgZ(22,"div",15)(23,"p",16),t._uU(24," OR "),t.qZA()(),t.TgZ(25,"a",17),t.NdJ("click",function(){return s.guestSession()}),t._uU(26," Proceed as a Guest "),t.qZA()()()()()(),t.YNc(27,C,1,1,"ng-template",null,18,t.W1O)),2&e){const d=t.MAs(28);t.xp6(6),t.Q6J("formGroup",s.loginForm),t.xp6(4),t.Q6J("tuiTextfieldLabelOutside",!0)("tuiTextfieldCleaner",!0),t.xp6(2),t.Q6J("ngTemplateOutlet",d)("ngTemplateOutletContext",t.VKq(11,L,s.f.email)),t.xp6(4),t.Q6J("tuiTextfieldLabelOutside",!0),t.xp6(2),t.Q6J("ngTemplateOutlet",d)("ngTemplateOutletContext",t.VKq(13,O,s.f.password)),t.xp6(1),t.Q6J("showLoader",t.lcZ(20,9,s.isSigningIn))}},dependencies:[a.O5,a.tP,h.K3,h.wU,w.MB,m.be,m.xT,m.sz,T.v0,x.Vs,x.F6,o._Y,o.JJ,o.JL,o.sg,o.u,a.Ov]})}const S=[{path:"",component:u,children:[{path:"login",component:g},{path:"",redirectTo:"login",pathMatch:"full"}]}];class p{static#t=this.\u0275fac=function(e){return new(e||p)};static#e=this.\u0275mod=t.oAB({type:p});static#i=this.\u0275inj=t.cJS({imports:[l.Bz.forChild(S),l.Bz]})}class f{static#t=this.\u0275fac=function(e){return new(e||f)};static#e=this.\u0275mod=t.oAB({type:f});static#i=this.\u0275inj=t.cJS({imports:[a.ez,p,h.Qf,m.cn,T.fN,x.UO,o.UX,o.u5]})}}}]);